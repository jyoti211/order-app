// npm packages
const mongoose = require('mongoose');

// app imports
const { APIError } = require('../helpers');

// globals
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: String,
    distance: Number,
    status: String,
    origin: Array,
    destination: Array
});

orderSchema.statics = {
  /**
   * Create a New Order
   */
    async createOrder(newOrder) {
        try {
              const duplicate = await this.findOne({
                  id: newOrder.id
              });

            if (duplicate) {
                return response.status(500).json({
                    error: "ORDER_ALREADY_EXISTS"
                });
            }

              const order = await newOrder.save();
              return order.toObject();
        } catch (err) {
              return Promise.reject(err);
        }
    },

  /**
   * Get Orders List.
   */
    async readOrders(query, fields, skip, limit) {
        try {
            const orders = await this.find(query, fields)
                .skip(skip)
                .limit(limit)
                .exec();
            if (!orders.length) {
                return [];
            }
              return orders.map(order => order.toObject());
        } catch (err) {
              return Promise.reject(err);
        }
    },

    /**
   * PUT/Update a order.
   */
    async updateOrder(id, orderUpdate) {
        try {
            const order = await this.findOne({
                  id
            }, (err, data) => {
              return data
            });

            if (!order) {
                throw new APIError(404, `No order with '${id}' found`);
            } else if (order.status === "TAKEN" && orderUpdate.status === "TAKEN") {     
                throw new APIError(409, `ORDER_ALREADY_BEEN_TAKEN`)                       
            } else {
                return await order.update(orderUpdate);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
};

/* Transform Response. */

if (!orderSchema.options.toObject) orderSchema.options.toObject = {};
  orderSchema.options.toObject.transform = (doc, ret) => {
      const transformed = ret;
      delete transformed._id;
      delete transformed.__v;
      delete transformed.origin;
      delete transformed.destination;
      return transformed;
};

module.exports = mongoose.model('Order', orderSchema);

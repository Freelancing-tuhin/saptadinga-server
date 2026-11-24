"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingControllers = void 0;
const message_1 = require("../../../../constants/message");
const asyncHandler_1 = require("../../../../utils/asyncHandler");
const apiResponse_1 = require("../../../../utils/apiResponse");
const appError_1 = require("../../../../utils/appError");
const booking_service_1 = require("../../../../services/booking/booking.service");
const createBookingControllers = ({ bookingModel, capacity, confirmedOnly, onEnquiry }) => {
    const countable = (bookings) => confirmedOnly ? bookings.filter(booking_service_1.isConfirmed) : bookings;
    return {
        create: (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const booking = yield bookingModel.create(req.body);
            if (req.body.notifyEnquiry === true)
                void (onEnquiry === null || onEnquiry === void 0 ? void 0 : onEnquiry(booking, booking.id));
            return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.post.succ, booking);
        }), message_1.MESSAGE.post.fail),
        getDashboardStats: (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const bookings = yield bookingModel.find();
            return (0, apiResponse_1.respond)(res, 200, message_1.MESSAGE.get.succ, Object.assign({}, (0, booking_service_1.buildDashboardStats)(countable(bookings))));
        }), message_1.MESSAGE.get.fail),
        update: (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const updated = yield bookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated)
                throw (0, appError_1.notFound)(message_1.MESSAGE.patch.fail);
            return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.patch.succ, updated);
        }), message_1.MESSAGE.patch.fail),
        list: (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const bookings = yield bookingModel.find().sort({ createdAt: -1 });
            return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, bookings);
        }), message_1.MESSAGE.get.fail),
        getAvailability: (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const bookings = yield bookingModel.find();
            return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, (0, booking_service_1.buildAvailability)(countable(bookings), capacity));
        }), message_1.MESSAGE.get.fail),
        remove: (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const deleted = yield bookingModel.findByIdAndDelete(req.params.id);
            if (!deleted)
                throw (0, appError_1.notFound)(message_1.MESSAGE.delete.fail);
            return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.delete.succ, deleted);
        }), message_1.MESSAGE.delete.fail)
    };
};
exports.createBookingControllers = createBookingControllers;

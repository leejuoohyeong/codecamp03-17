"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Payment = void 0;
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var Payment = /** @class */ (function () {
    function Payment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return String; })
    ], Payment.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], Payment.prototype, "amount");
    Payment = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)()
    ], Payment);
    return Payment;
}());
exports.Payment = Payment;

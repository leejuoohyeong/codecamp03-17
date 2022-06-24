"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateProductInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var productSaleslocation_input_1 = require("../../productSaleslocation/dto/productSaleslocation.input");
var CreateProductInput = /** @class */ (function () {
    function CreateProductInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; })
    ], CreateProductInput.prototype, "name");
    __decorate([
        (0, graphql_1.Field)(function () { return String; })
    ], CreateProductInput.prototype, "description");
    __decorate([
        (0, class_validator_1.Min)(0),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], CreateProductInput.prototype, "price");
    __decorate([
        (0, graphql_1.Field)(function () { return productSaleslocation_input_1.ProductSaleslocationInput; })
    ], CreateProductInput.prototype, "productSaleslocation");
    __decorate([
        (0, graphql_1.Field)(function () { return String; })
    ], CreateProductInput.prototype, "productCategoryId");
    __decorate([
        (0, graphql_1.Field)(function () { return [String]; })
    ], CreateProductInput.prototype, "productTags");
    CreateProductInput = __decorate([
        (0, graphql_1.InputType)()
    ], CreateProductInput);
    return CreateProductInput;
}());
exports.CreateProductInput = CreateProductInput;

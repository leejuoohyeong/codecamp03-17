"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductCategory = void 0;
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var ProductCategory = /** @class */ (function () {
    function ProductCategory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return String; })
    ], ProductCategory.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ unique: true }) //유니크 상태 만들기
        ,
        (0, graphql_1.Field)(function () { return String; })
    ], ProductCategory.prototype, "name");
    ProductCategory = __decorate([
        (0, typeorm_1.Entity)() //테이블로 만들어주는 명령어
        ,
        (0, graphql_1.ObjectType)()
    ], ProductCategory);
    return ProductCategory;
}());
exports.ProductCategory = ProductCategory;

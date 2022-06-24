"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Product = void 0;
var graphql_1 = require("@nestjs/graphql");
var productSaleslocation_entity_1 = require("../../productSaleslocation/entites/productSaleslocation.entity");
var productCategory_entity_1 = require("../../productsCategory/entities/productCategory.entity");
var productTag_entity_1 = require("../../productTags/entities/productTag.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var typeorm_1 = require("typeorm");
//상품
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return String; })
    ], Product.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)() //MySQL에 들어가는 타입
        ,
        (0, graphql_1.Field)(function () { return String; })
    ], Product.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return String; })
    ], Product.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], Product.prototype, "price");
    __decorate([
        (0, typeorm_1.Column)({ "default": false }),
        (0, graphql_1.Field)(function () { return Boolean; })
    ], Product.prototype, "isSoldout");
    __decorate([
        (0, typeorm_1.DeleteDateColumn)()
    ], Product.prototype, "deletedAt");
    __decorate([
        (0, typeorm_1.JoinColumn)() //one to one관계로 연결해 주려면 넣어줘야합니다.
        ,
        (0, typeorm_1.OneToOne)(function () { return productSaleslocation_entity_1.ProductSaleslocation; }) //ProductSaleslocation과의 1:1 관계 //FK
        ,
        (0, graphql_1.Field)(function () { return productSaleslocation_entity_1.ProductSaleslocation; })
    ], Product.prototype, "productSaleslocation");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return productCategory_entity_1.ProductCategory; }) //ProductCategory과의 many:1 관계 //FK
        ,
        (0, graphql_1.Field)(function () { return productCategory_entity_1.ProductCategory; })
    ], Product.prototype, "productCategory");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }),
        (0, graphql_1.Field)(function () { return user_entity_1.User; })
    ], Product.prototype, "user");
    __decorate([
        (0, typeorm_1.JoinTable)() //다대다일때 둘줄 아무곳에 입력해주는 것이고 중간테이블을 생성 시키는 명령어입니다.
        ,
        (0, typeorm_1.ManyToMany)(function () { return productTag_entity_1.ProductTag; }, function (ProductTags) { return ProductTags.products; }) //다대 다는 반대의 입장도 써줘야합니다.
        ,
        (0, graphql_1.Field)(function () { return [productTag_entity_1.ProductTag]; })
    ], Product.prototype, "productTags");
    Product = __decorate([
        (0, typeorm_1.Entity)(),
        (0, graphql_1.ObjectType)()
    ], Product);
    return Product;
}());
exports.Product = Product;

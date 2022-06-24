"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        (0, graphql_1.Field)(function () { return String; })
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return String; })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)() //데이터베이스에 들어가게끔
        ,
        (0, graphql_1.Field)(function () { return String; })
    ], User.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], User.prototype, "age");
    __decorate([
        (0, typeorm_1.Column)({ "default": 0 }),
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], User.prototype, "point");
    User = __decorate([
        (0, typeorm_1.Entity)() //테이블로 만들어주는 명령어
        ,
        (0, graphql_1.ObjectType)()
    ], User);
    return User;
}());
exports.User = User;

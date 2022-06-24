"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Board = void 0;
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("typeorm");
var Board = /** @class */ (function () {
    function Board() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('increment') //숫자를 하나씩 증가시키려면 increment를 쓰면 된다.
        ,
        (0, graphql_1.Field)(function () { return graphql_1.Int; }) //그래프 QL타입으로 읽게 만들어주는것
    ], Board.prototype, "number");
    __decorate([
        (0, typeorm_1.Column)() //mySQL타입을 위한
        ,
        (0, graphql_1.Field)(function () { return String; }) //그래프 QL타입으로 읽게 만들어주는것
    ], Board.prototype, "writer");
    __decorate([
        (0, typeorm_1.Column)() //mySQL타입을 위한
        ,
        (0, graphql_1.Field)(function () { return String; }) //그래프 QL타입으로 읽게 만들어주는것
    ], Board.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)() //mySQL타입을 위한
        ,
        (0, graphql_1.Field)(function () { return String; }) //그래프 QL타입으로 읽게 만들어주는것
    ], Board.prototype, "contents");
    Board = __decorate([
        (0, typeorm_1.Entity)() //mySQL타입을 위한
        ,
        (0, graphql_1.ObjectType)() //그래프 QL타입으로 읽게 만들어주는것
    ], Board);
    return Board;
}());
exports.Board = Board;

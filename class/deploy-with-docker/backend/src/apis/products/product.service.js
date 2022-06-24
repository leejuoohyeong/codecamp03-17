"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.ProductService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var productSaleslocation_entity_1 = require("../productSaleslocation/entites/productSaleslocation.entity");
var productTag_entity_1 = require("../productTags/entities/productTag.entity");
var product_entity_1 = require("./entities/product.entity");
var ProductService = /** @class */ (function () {
    function ProductService(productRepository, productSaleslocationRepository, 
    //아래 크리에이트 부분에 프로덕트 태그 를 사용하기 위해 선행으로 불러오는 부분(const tagname)
    productTagRepository) {
        this.productRepository = productRepository;
        this.productSaleslocationRepository = productSaleslocationRepository;
        this.productTagRepository = productTagRepository;
    }
    //findAll, findone은 조회하는 부분
    ProductService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productRepository.find({
                            relations: ['productSaleslocation', 'productCategory', 'productTags']
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProductService.prototype.findOne = function (_a) {
        var productId = _a.productId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.productRepository.findOne({
                            where: { id: productId },
                            relations: ['productSaleslocation', 'productCategory', 'productTags']
                        })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ProductService.prototype.create = function (_a) {
        var createProductInput = _a.createProductInput;
        return __awaiter(this, void 0, void 0, function () {
            var productSaleslocation, productCategoryId, productTags, product, result, result2, i, tagname, prevTag, newTag, result3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productSaleslocation = createProductInput.productSaleslocation, productCategoryId = createProductInput.productCategoryId, productTags = createProductInput.productTags, product = __rest(createProductInput, ["productSaleslocation", "productCategoryId", "productTags"]);
                        return [4 /*yield*/, this.productSaleslocationRepository.save(__assign({}, productSaleslocation))];
                    case 1:
                        result = _b.sent();
                        result2 = [];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < productTags.length)) return [3 /*break*/, 7];
                        tagname = productTags[i].replace('#', '');
                        return [4 /*yield*/, this.productTagRepository.findOne({
                                name: tagname
                            })];
                    case 3:
                        prevTag = _b.sent();
                        if (!prevTag) return [3 /*break*/, 4];
                        result2.push(prevTag);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.productTagRepository.save({ name: tagname })];
                    case 5:
                        newTag = _b.sent();
                        result2.push(newTag); //빈배열 result2 에 만든 newTag를 넣기
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 2];
                    case 7: return [4 /*yield*/, this.productRepository.save(__assign(__assign({}, product), { productSaleslocation: result, 
                            //productCategoryId 분리 한것 출력
                            productCategory: { id: productCategoryId }, 
                            // 사용해주는곳 productTags // ["#전자제품", "#영등포", "#컴퓨터"]
                            productTags: result2 }))];
                    case 8:
                        result3 = _b.sent();
                        return [2 /*return*/, result3];
                }
            });
        });
    };
    ProductService.prototype.update = function (_a) {
        var productId = _a.productId, updateProductInput = _a.updateProductInput;
        return __awaiter(this, void 0, void 0, function () {
            var myproduct, newProduct;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.productRepository.findOne({
                            where: { id: productId }
                        })];
                    case 1:
                        myproduct = _b.sent();
                        newProduct = __assign(__assign(__assign({}, myproduct), { id: productId }), updateProductInput);
                        return [4 /*yield*/, this.productRepository.save(newProduct)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ProductService.prototype.checkSoldout = function (_a) {
        var productId = _a.productId;
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.productRepository.findOne({
                            where: { id: productId }
                        })];
                    case 1:
                        product = _b.sent();
                        if (product.isSoldout) {
                            throw new common_1.UnprocessableEntityException('이미 판매 완료된 상품입니다.');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype["delete"] = function (_a) {
        var productId = _a.productId;
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.productRepository.softDelete({ id: productId })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.affected ? true : false];
                }
            });
        });
    };
    ProductService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
        __param(1, (0, typeorm_1.InjectRepository)(productSaleslocation_entity_1.ProductSaleslocation)),
        __param(2, (0, typeorm_1.InjectRepository)(productTag_entity_1.ProductTag))
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commande = void 0;
var typeorm_1 = require("typeorm");
var Commande = /** @class */ (function () {
    function Commande() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Commande.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'integer' }),
        __metadata("design:type", Number)
    ], Commande.prototype, "id_restaurant", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'character varying' }),
        __metadata("design:type", String)
    ], Commande.prototype, "menu", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'money' }),
        __metadata("design:type", String)
    ], Commande.prototype, "prix", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'integer' }),
        __metadata("design:type", Number)
    ], Commande.prototype, "user_id", void 0);
    Commande = __decorate([
        (0, typeorm_1.Entity)()
    ], Commande);
    return Commande;
}());
exports.Commande = Commande;

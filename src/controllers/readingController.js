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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReading = exports.updateReading = exports.getReadingById = exports.getReadingByDate = exports.getAllReading = exports.createReading = void 0;
// Importation des dépendances nécessaires
var dotenv = require("dotenv");
dotenv.config();
var readingService_1 = require("../services/readingService");
// Exemple de valeurs par défaut pour `jour` et `titre` (à adapter selon votre logique)
var defaultJour = {
    id: 0,
    weekday: "",
    date: "",
    theme: "",
    label: "",
    text: ""
};
var defaultTitre = "Default Title";
// Initialisation du manager
var manager = new readingService_1.default(defaultJour, defaultTitre);
// Création de la lecture dans la DB
var createReading = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jour, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jour = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, manager.createReading(jour)];
            case 2:
                data = _a.sent();
                console.log("Lecture créée avec succès:", data);
                res.status(201).json(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error creating data:", error_1);
                res.status(500).json({ error: "Error server" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createReading = createReading;
// Récupartion de toutes les données de la DB
var getAllReading = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, manager.getAllReading()];
            case 1:
                data = _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Erreur de récupération:", error_2);
                res.status(500).json({ error: "Error server" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllReading = getAllReading;
// Récupération d'une lecture par sa date 
var getReadingByDate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jour, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jour = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, manager.getReadingByDate(jour)];
            case 2:
                data = _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Erreur de récupération:", error_3);
                res.status(500).json({ error: "Error server." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getReadingByDate = getReadingByDate;
var getReadingById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jour, id, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jour = req.params;
                id = Number(jour.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, manager.getReadingById(id)];
            case 2:
                data = _a.sent();
                res.status(200).json(data);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Erreur de récupération:", error_4);
                res.status(500).json({ error: "Error server." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getReadingById = getReadingById;
var updateReading = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jour, data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jour = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, manager.updateReading(jour)];
            case 2:
                data = _a.sent();
                res.status(205).json(data);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error("Error updating data", error_5);
                res.status(500).json({ error: "Error server" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateReading = updateReading;
var deleteReading = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jour, data, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jour = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, manager.deleteReading(jour)];
            case 2:
                data = _a.sent();
                res.status(202).json(data);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Erreur de suppression:", error_6);
                res.status(500).json({ error: "Error server." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteReading = deleteReading;

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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var lectureManager = /** @class */ (function () {
    function lectureManager(lec, titre) {
        this.titre = titre;
        this.lec = lec;
        this.data = {
            date: ""
        };
    }
    lectureManager.prototype.getAllReading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.reading_FR.findMany({
                            select: {
                                id: true,
                                weekday: true,
                                date: true,
                                label: true,
                                theme: true,
                                text: true
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    lectureManager.prototype.getReadingByDate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.reading_FR.findFirst({
                            where: {
                                date: data.date
                            },
                            select: {
                                id: true,
                                weekday: true,
                                date: true,
                                label: true,
                                theme: true,
                                text: true
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    lectureManager.prototype.getReadingById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.reading_FR.findUnique({
                            where: { id: id },
                            select: {
                                id: true,
                                weekday: true,
                                date: true,
                                label: true,
                                theme: true,
                                text: true
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    lectureManager.prototype.createReading = function (jour) {
        return __awaiter(this, void 0, void 0, function () {
            var mydata;
            return __generator(this, function (_a) {
                mydata = {
                    date: jour.date
                };
                this.getReadingByDate(mydata).then(function (lecture) {
                    if (!lecture) {
                        var texte = typeof jour.text === 'string' ? [jour.text] : jour.text;
                        var data = prisma.reading_FR.create({ data: {
                                weekday: jour.weekday,
                                date: jour.date,
                                label: jour.label,
                                theme: jour.theme,
                                text: texte
                            } });
                        return data;
                    }
                    else {
                        console.log("Lecture already exist in database.");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    lectureManager.prototype.updateReading = function (jour) {
        return __awaiter(this, void 0, void 0, function () {
            var mydata;
            return __generator(this, function (_a) {
                mydata = {
                    date: jour.date
                };
                this.getReadingByDate(mydata).then(function (lecture) {
                    if (lecture) {
                        var texte = typeof jour.text === 'string' ? [jour.text] : jour.text;
                        return prisma.reading_FR.update({ where: { id: lecture.id }, data: {
                                weekday: jour.weekday,
                                date: jour.date,
                                label: jour.label,
                                theme: jour.theme,
                                text: texte
                            } });
                    }
                    else {
                        console.log("Lecture not found for the given date and month.");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    lectureManager.prototype.deleteReading = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getReadingByDate(data).then(function (lecture) {
                    if (lecture) {
                        return prisma.reading_FR.delete({ where: { id: lecture.id } });
                    }
                    else {
                        console.log("Reading not found for the given date and month.");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return lectureManager;
}());
exports.default = lectureManager;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const note_middleware_1 = __importDefault(require("./middlewares/note.middleware"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/notes', note_routes_1.default);
app.use((err, req, res, next) => {
    (0, note_middleware_1.default)(err, req, res, next);
});
(0, db_1.default)()
    .then(() => {
    app.listen(port, () => { console.log('Express server running on port ' + port); });
    console.log('port should be: ' + process.env.PORT);
}).catch((err) => {
    console.log('Error connecting to database: ' + err);
    process.exit(1);
});

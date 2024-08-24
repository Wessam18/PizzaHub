"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var google_auth_library_1 = require("google-auth-library");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var router = express_1.default.Router();
var oAuthClient = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
router.get('/', function (req, res) {
    var authorizeUrl = oAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'openid', 'email'],
        prompt: 'consent'
    });
    res.json({ url: authorizeUrl });
});
exports.default = router;

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
var _this = this;
// HTML elements
var positionSelect = document.getElementById('position');
var pointsSlider = document.getElementById('points');
var twoPercentSlider = document.getElementById('two-percent');
var threePercentSlider = document.getElementById('three-percent');
var form = document.getElementById('search-form');
var resultsTable = document.getElementById('results-body');
var teamContainer = document.getElementById('team-container');
// listener 
form.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
    var position, points, twoPercent, threePercent, body, response, players, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                position = String(positionSelect.value);
                points = Number(pointsSlider.value);
                twoPercent = Number(twoPercentSlider.value);
                threePercent = Number(threePercentSlider.value);
                body = JSON.stringify({
                    position: position,
                    twoPercent: twoPercent,
                    threePercent: threePercent,
                    points: points
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch('https://nbaserver-q21u.onrender.com/api/filter', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: body
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("error: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                players = _a.sent();
                displayResults(players);
                console.log(players);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("error", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//display results in table
function displayResults(players) {
    resultsTable.innerHTML = '';
    players.forEach(function (player) {
        var row = document.createElement('tr');
        var playerName = document.createElement('td');
        playerName.textContent = player.playerName;
        var position = document.createElement('td');
        position.textContent = player.position;
        var points = document.createElement('td');
        points.textContent = player.points.toString();
        var twoPercent = document.createElement('td');
        twoPercent.textContent = player.twoPercent.toString() + '%';
        var threePercent = document.createElement('td');
        threePercent.textContent = player.threePercent.toString() + '%';
        var main = document.createElement('td');
        var addButton = document.createElement('button');
        addButton.textContent = 'Add to Team';
        addButton.addEventListener('click', function () { return addToTeam(player.position, player.playerName, player.points); });
        main.appendChild(addButton);
        row.appendChild(playerName);
        row.appendChild(position);
        row.appendChild(points);
        row.appendChild(twoPercent);
        row.appendChild(threePercent);
        row.appendChild(main);
        resultsTable.appendChild(row);
    });
}
//  add player to team
function addToTeam(position, playerName, points) {
    var positionDiv = document.getElementById(position.toLowerCase());
    if (positionDiv) {
        //clear the boxes , to prevent duplicate players
        positionDiv.textContent = '';
        var positionStrong = document.createElement('strong');
        positionStrong.textContent = position;
        var playerNameP = document.createElement('p');
        playerNameP.textContent = playerName;
        var pointsP = document.createElement('p');
        pointsP.textContent = "Points: ".concat(points);
        positionDiv.appendChild(positionStrong);
        positionDiv.appendChild(playerNameP);
        positionDiv.appendChild(pointsP);
    }
}

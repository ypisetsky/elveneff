'use strict';

import {cultureIndex, popIndex, outputIndex} from './util';
import Img from './images';

const HumanData = {
  Residence: [
    [1,2,2,0,0,31],
    [1,2,2,3,0,4],
    [1,2,2,4,0,5],
    [1,2,2,6,0,6],
    [2,3,2,19,0,32], // 5
    [2,3,2,5,0,10],
    [2,3,2,4,0,12],
    [2,3,2,5,0,10],
    [3,4,3,57,0,150],
    [3,4,3,9,0,40], //10
    [3,4,3,9,0,40],
    [3,4,3,9,0,40],
    [3,4,3,9,0,50],
    [3,4,3,10,0,60],
    [3,4,3,9,0,70], // 15
    [6,5,2,38,0,20],
    [6,5,2,21,0,30],
    [7,5,2,23,0,30],
    [7,5,2,25,0,40],
    [8,4,3,85,0,70], // 20
    [8,4,3,34,0,150],
    [9,4,3,44,0,190],
    [9,4,3,47,0,110],
    [10,3,5,181,0,450],
    [10,3,5,68,0,170], // 25
    [11,3,5,76,0,180],
    [11,3,5,83,0,200],
    [12,4,4,158,0,400],
    [12,4,4,108,0,200],
    [13,4,4,120,0,300], // 30
    [13,4,4,131,0,300],
  ],
  Workshop: [
    [1,2,2,0,15,29],
    [1,2,2,2,7,53],
    [1,2,2,5,9,74],
    [1,2,2,7,8,94],
    [1,2,2,9,6,113], // 5
    [1,2,2,5,8,131],
    [2,2,3,19,38,223],
    [2,2,3,6,11,249],
    [2,2,3,5,15,274],
    [2,2,3,5,19,298], // 10
    [4,3,4,73,168,644],
    [4,3,4,10,33,691],
    [4,3,4,8,38,738],
    [4,3,4,8,45,783],
    [4,3,4,7,51,828], // 15
    [6,3,5,122,169,1090],
    [6,3,5,34,39,1160],
    [ 7,6,3, 109,183,1470],
    [ 7,6,3,  48, 60,1550],
    [ 8,6,3,  51,101,1640], // 20
    [ 8,6,3,  56,109,1740],
    [ 9,4,5, 141,257,2040],
    [ 9,4,5,  82,145,2160],
    [10,4,5,  88,159,2280],
    [10,4,5,  96,179,2410], // 25
    [11,3,7, 162,293,2680],
    [11,3,7, 122,222,2830],
    [12,3,7, 137,263,3000],
    [12,3,7, 149,209,3170],
    [13,4,6, 413,764,3830],
    [13,4,6, 207,356,4050],
  ],
  Marble: [
    [1,2,1,0,21,9],
    [1,2,1,2,2,13],
    [1,2,1,2,3,16],
    [1,2,1,2,3,19],
    [2,3,2,21,67,66], // 5
    [2,3,2,3,12,75],
    [2,3,2,3,17,88],
    [2,3,2,4,14,97],
    [4,4,3,45,187,217],
    [4,4,3,9,58,235], // 10
    [4,4,3,10,59,257],
    [4,4,3,11,61,279],
    [4,4,3,13,75,301],
    [4,4,3,14,90,323],
    [4,4,3,15,106,342], // 15
    [6,5,3,74,343,446],
    [6,5,3,41,171,480],
    [6,5,3,48,199,518],
    [6,5,3,57,228,559],
    [9,6,3,214,444,725], // 20
    [ 9,6,3,106, 332,781],
    [ 9,6,3,125, 383,841],
    [ 9,6,3,148, 442,910],
  ],
  Steel: [
    [1,2,2,0,38,19],
    [1,2,2,4,4,25],
    [1,2,2,4,5,31],
    [1,2,2,6,5,38],
    [1,2,2,6,6,44], // 5
    [1,2,2,2,8,50],
    [2,3,3,33,104,132],
    [2,3,3,7,20,148],
    [2,3,3,6,32,163],
    [2,3,3,8,40,179], // 10
    [4,4,4,74,275,345],
    [4,4,4,17,73,373],
    [4,4,4,18,91,402],
    [4,4,4,21,110,430],
    [4,4,4,23,128,458], // 15
    [6,3,5,24,77,468],
    [6,3,5,45,156,480],
    [6,3,5,54,180,518],
    [6,3,5,64,208,559],
    [9,3,6,172,600,725], // 20
    [ 9,6,3,106, 332,781],
    [ 9,6,3,125, 383,841],
    [ 9,6,3,148, 442,910],
  ],
  Planks: [
    [1,2,2,0,34,19],
    [1,2,2,5,4,25],
    [1,2,2,4,4,31],
    [1,2,2,7,5,38],
    [1,2,2,6,5,44],
    [2,3,3,33,81,116],
    [2,3,3,6,20,132],
    [2,3,3,7,18,148],
    [2,3,3,7,29,163],
    [4,3,4,73,218,317],
    [4,4,4,17,65,345],
    [4,4,4,18,66,373],
    [4,4,4,21,82,402],
    [4,4,4,22,99,430],
    [4,4,4,25,115,458],
    [6,3,6,83,252,534],
    [6,3,6,60,169,577],
    [6,3,6,71,195,621],
    [6,3,6,84,224,672],
    [9,6,3,39,475,725],
    [9,6,3,106,332,781],
    [9,6,3,125,383,841],
    [9,6,3,148,442,910],
  ],
  Crystal: [
    [2,3,2,0,80,28],
    [2,3,2,9,9,38],
    [2,3,2,9,9,47],
    [2,3,2,12,11,56],
    [3,3,3,33,73,100],
    [3,3,3,7,25,116],
    [3,3,3,8,31,132],
    [3,3,3,8,28,148],
    [5,4,3,42,149,217],
    [5,4,3,14,73,235],
    [5,4,3,15,75,257],
    [5,4,3,18,78,279],
    [5,4,3,19,96,301],
    [5,4,3,22,115,323],
    [5,4,3,24,134,342],
    [7,4,4,138,531,493],
    [7,4,4,68,233,534],
    [7,4,4,80,270,574],
    [7,4,4,95,310,618],
    [10,4,5,294,1030,835],
    [10,4,5,165,516,901],
    [10,4,5,194,596,973],
    [10,4,5,230,687,1048],
  ],
  Scrolls: [
    [1,2,3,0,88,28],
    [1,2,3,8,9,38],
    [1,2,3,8,11,47],
    [1,2,3,11,12,56],
    [1,2,3,11,14,66],
    [3,3,3,25,94,116],
    [3,3,3,7,34,132],
    [3,3,3,8,31,148],
    [3,3,3,8,49,163],
    [5,3,4,42,195,235],
    [5,3,4,14,83,257],
    [5,3,4,15,85,279],
    [5,3,4,18,105,301],
    [5,3,4,19,127,323],
    [5,3,4,22,148,342],
    [7,4,4,162,432,493],
    [7,4,4,68,233,534],
    [7,4,4,80,270,574],
    [7,4,4,95,310,618],
    [10,5,4,294,1030,835],
    [10,5,4,165,516,901],
    [10,5,4,194,596,973],
    [10,5,4,230,687,1048],
  ],
  Silk: [
    [1,3,3,0,108,41],
    [1,3,3,15,12,56],
    [1,3,3,14,13,69],
    [1,3,3,20,15,85],
    [1,3,3,20,16,100],
    [3,3,4,33,84,154],
    [3,3,4,12,38,173],
    [3,3,4,12,33,195],
    [3,3,4,14,54,217],
    [5,4,4,68,213,317],
    [5,4,4,23,90,345],
    [5,4,4,26,93,373],
    [5,4,4,28,115,402],
    [5,4,4,32,138,430],
    [5,4,4,35,162,458],
    [7,4,5,120,713,618],
    [7,4,5,85,291,665],
    [7,4,5,100,336,719],
    [7,4,5,119,388,775],
    [10,5,4,139,419,835],
    [10,5,4,165,516,901],
    [10,5,4,194,596,973],
    [10,5,4,230,687,1048],
  ],
  Elixir: [
    [3,3,3,0,123,41],
    [3,3,3,17,14,56],
    [3,3,3,17,15,69],
    [4,3,4,41,73,113],
    [4,3,4,30,25,132],
    [4,3,4,12,34,154],
    [4,3,4,13,42,173],
    [5,4,4,62,161,260],
    [5,4,4,22,82,289],
    [5,4,4,24,101,317],
    [5,4,4,26,103,345],
    [5,4,4,29,106,373],
    [5,4,4,33,131,402],
    [5,4,4,36,158,430],
    [5,4,4,40,185,458],
    [8,4,5,138,815,618],
    [8,4,5,97,333,665],
    [8,4,5,114,384,719],
    [8,4,5,135,443,775],
    [11,6,4,369,1280,1004],
    [11,6,4,226,708,1083],
    [11,6,4,267,817,1167],
    [11,6,4,314,943,1262],
  ],
  "Magic Dust": [
    [3,3,2,0,100,28],
    [3,3,2,9,11,38],
    [3,3,2,9,13,47],
    [4,4,3,43,151,113],
    [4,4,3,25,31,132],
    [4,4,3,10,41,154],
    [4,4,3,10,52,173],
    [5,5,4,91,344,323],
    [5,5,4,22,126,361],
    [5,5,4,24,154,395],
    [5,5,4,27,157,430],
    [5,5,4,30,163,464],
    [5,5,4,33,200,502],
    [5,5,4,37,241,537],
    [5,5,4,42,283,571],
    [8,5,4,128,101,618],
    [8,5,4,97,333,665],
    [8,5,4,114,384,719],
    [8,5,4,135,443,775],
    [11,4,6,369,1280,1004],
    [11,4,6,226,708,1083],
    [11,4,6,267,817,1167],
    [11,4,6,314,943,1262],
  ],
  Gems: [
    [3,3,4,0,182,56],
    [3,3,4,21,21,75],
    [3,3,4,20,22,91],
    [3,3,4,27,25,113],
    [4,4,4,60,120,176],
    [4,4,4,14,50,204],
    [4,4,4,15,63,232],
    [4,4,4,18,58,260],
    [5,4,5,68,249,361],
    [5,4,5,27,140,395],
    [5,4,5,30,143,430],
    [5,4,5,33,148,464],
    [5,4,5,37,182,502],
    [5,4,5,42,219,537],
    [5,4,5,45,257,571],
    [8,5,4,83,289,618],
    [8,5,4,97,333,665],
    [8,5,4,114,384,719],
    [8,5,4,135,443,775],
    [11,4,6,369,1280,1004],
    [11,4,6,226,708,1083],
    [11,4,6,267,817,1167],
    [11,4,6,314,943,1262],
  ],
  "Armory (Training)": [
    [1,2,2,0,18,3],
    [1,2,2,11,3,4],
    [1,2,2,16,3,5],
    [1,2,2,23,3,6],
    [2,3,3,132,42,14],
    [2,3,3,25,9,15],
    [2,3,3,25,10,16],
    [2,3,3,25,9,17],
    [4,4,4,258,107,31],
    [4,4,4,44,31,32],
    [4,4,4,46,31,33],
    [4,4,4,46,32,34],
    [4,4,4,46,39,36],
    [4,4,4,48,47,38],
    [4,4,4,47,55,40],
    [6,4,5,401,156,50],
    [6,4,5,135,37,60],
    [7,3,6,67,32,70],
    [7,3,6,84,33,80],
    [8,5,5,795,295,130],
    [8,5,5,235,105,140],
    [8,5,5,292,115,150],
    [8,5,5,315,126,160],
    [10,6,4,200,79,170],
    [10,6,4,352,151,185],
    [10,6,4,394,159,200],
    [10,6,4,428,177,215],
    [12,7,3,225,95,230],
    [12,7,3,236,100,245],
    [12,7,3,364,113,260],
    [12,7,3,556,218,280],
  ],
  Barracks: [
    [1,3,4,0,8,1],
    [1,3,4,10,7,2],
    [1,3,4,28,12,3],
    [1,3,4,56,17,4],
    [2,4,5,97,19,5],
    [2,4,5,82,26,6],
    [2,4,5,98,34,7],
    [2,4,5,116,37,9],
    [3,5,6,134,54,11],
    [3,5,6,153,69,14],
    [3,5,6,171,78,17],
    [3,5,6,191,89,20],
    [3,5,6,211,112,23],
    [3,5,6,231,139,27],
    [3,5,6,251,169,31],
    [6,8,4,388,128,39],
    [6,8,4,436,141,49],
    [7,7,4,489,173,59],
    [7,7,4,549,169,71],
    [8,7,4,614,245,84],
    [8,7,4,686,274,98],
    [9,5,7,766,279,113],
    [9,5,7,855,289,129],
    [9,5,7,954,355,146],
    [9,5,7,1061,410,164],
    [11,6,6,1182,434,184],
    [11,6,6,1314,493,200],
    [11,6,6,1460,573,230],
    [11,6,6,1622,493,250],
    [13,5,8,1801,690,270],
    [13,5,8,1997,712,300],
    [13,5,8,2216,785,320],
    [13,5,8,2455,999,350],
  ],

}

module.exports = HumanData;

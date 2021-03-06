import moment from "moment";
import { exec } from "child_process";
import { checkenv } from "./rando";
import { resolve } from "path";
// import { determinenames } from "./rando";

let unit: "minute" | "hour";
if (!checkenv("NODE_ENV") || process.env.NODE_ENV === "prod" || process.env.NODE_ENV === "production") unit = "hour";
else unit = "minute";

mainfn();
// get which hour of the day it is
// get end of hour
// set it to that wallpaper
// repeat yoy


function mainfn(): void {
   exec(`gsettings set org.cinnamon.desktop.background picture-uri \"file://${resolve(__dirname, "../wallpapers", `${moment().get(unit)}.png`)}\"`);
   setTimeout(mainfn, getnexttime());
}

function getnexttime(): number {
   // add ten is so that it doesnt trigger twice every hour occasionally
   return moment().endOf(unit).toDate().valueOf() - moment().valueOf() + 10;
}

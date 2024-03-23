import * as crypto from "crypto";

export function formatMillis(millis: number) {
	const pad = (n: number) => (n < 10 ? `0${n}` : n);

	const secs = millis / 1000;
	const h = Math.floor(secs / 3600);
	const m = Math.floor(secs / 60) - h * 60;
	const s = Math.floor(secs - h * 3600 - m * 60);

	return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const generateId = () =>
	BigInt("0x" + crypto.randomBytes(32).toString("hex"));

export const truncateString = (string = "", maxLength = 8) =>
	string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

import { Frog } from "frog";

export function createFrog() {
	return new Frog({
		imageAspectRatio: "1:1",
		imageOptions: {
			fonts: [
				{
					name: "Inter",
					source: "google",
					weight: 500,
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 300,
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 300,
					style: "italic",
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 400,
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 500,
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 600,
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 700,
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 400,
					style: "italic",
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 500,
					style: "italic",
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 600,
					style: "italic",
				},
				{
					name: "Chakra Petch",
					source: "google",
					weight: 700,
					style: "italic",
				},
			],
			height: 560,
			width: 560,
		},
	});
}

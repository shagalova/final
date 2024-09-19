
import { IDocData, IObjectIds } from "../types";

export function validateInn(inn:string) {
	let result = false;
	
		let checkDigit = function (inn:string, coefficients:number[]) {
			let n = 0;
			for (let i in coefficients) {
				n += coefficients[i] * parseInt(inn[i]);
			}
			return parseInt((n % 11 % 10).toString());
		};
	
				var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n10 === parseInt(inn[9])) {
					result = true;
				}
					
		if (!result) {
			console.log('Неправильное контрольное число');
		}
	
	return result;
}



export function formatDate(str: string) {
	
	const date = new Date(str);
	
	return new Intl.DateTimeFormat('ru').format(date)
}

export const totalReviews = (arr: {date: string, value: number}[]) => {
    const sum = arr.reduce((prev, cur) => {
    if(cur.value) {
    return prev + cur.value
} else return prev
}, 0);
return sum;
}


export const getItemsId = (arr:IObjectIds["items"] | null) => {
	const newarr =arr && arr.map(item => {
		const id = item.encodedId;
		return id
	});

	return newarr
}

export const takeURL = ({url, sourceName}: {url:IDocData["url"], sourceName:IDocData["sourceName"]}) => {
	let newSource;
	if( url === "" || !url) {
		newSource = sourceName
	} else {
		const source = new URL(url)
		newSource = `${source.protocol}//${source.hostname}`
	}
	return newSource;
}

export const findImgSrc = (text: string) => {
	const regex = /<img src="[^"]*">/g
	const result = text.toString().match(regex) 
	if(!result) return
	let imgSrc = result[0].split("").slice(10,-2).join("")
	if(imgSrc === "") return undefined
	return imgSrc
}


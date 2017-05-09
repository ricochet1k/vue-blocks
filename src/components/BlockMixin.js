

let keySym = Symbol('key');
let key = 1;

export default {
	methods: {
		keyFor(obj) {
			if (!obj) return obj;

			if (!obj[keySym])
				obj[keySym] = key++;
			return obj[keySym];
		}
	}
}


function buildFormData(formData: FormData, data: any, parentKey?: string) {
	if (data && typeof data === 'object' && !(data instanceof Date)) {
		if (Array.isArray(data)) {
			for (let i = 0; i < data.length; i++) {
				buildFormData(formData, data[i], `${parentKey}`)
			}
		} else if (data instanceof File) {
			formData.append(parentKey, data)
		} else {
			for (let key in data) {
				if (Object.prototype.hasOwnProperty.call(data, key)) {
					const value = data[key]
					if (parentKey) {
						buildFormData(formData, value, `${parentKey}`)
					} else {
						buildFormData(formData, value, key)
					}
				}
			}
		}
	} else {
		const value = data == null ? '' : data
		formData.append(parentKey, value)
	}
}

export function objToFormData(data: any): any {
	const formData = new FormData()
	buildFormData(formData, data)
	return formData
}

export function formDataToObj(formData: FormData): any {
	const obj = {}
	for (let [key, value] of formData.entries()) {
		obj[key] = value
	}
	return obj
}

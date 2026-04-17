export const getAllSearchKeys = (data) => {
    const result = [];
    for (const key in data) {
      if (key.trim() !== "") result.push(key);

      if (Array.isArray(data[key])) {
        data[key].forEach((item) => {
          if (item.title.trim() !== "") result.push(item.title);
        });
      } else if (typeof data[key] === "object") {
        for (const subKey in data[key]) {
          if (subKey.trim() !== "") result.push(subKey); // sub-category
          data[key][subKey].forEach((item) => {
            if (item.title.trim() !== "") result.push(item.title);
          });
        }
      }
    }

    return result;
  }
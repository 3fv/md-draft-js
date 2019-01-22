function isImage(file) {
  return file.kind === 'file' && file.type.split('/')[0] === 'image';
}

function getDataURL(file) {
  return new Promise((resolve, reject) => {
    try {
      const blob = file.getAsFile();
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (event) => {
        reject(event);

        reader.abort();
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports.getDataURL = getDataURL;
module.exports.isImage = isImage;
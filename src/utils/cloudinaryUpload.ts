const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce_unsigned");

  const response = await fetch("https://api.cloudinary.com/v1_1/dvceaeiqs/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.secure_url; 
};

export default uploadImageToCloudinary;

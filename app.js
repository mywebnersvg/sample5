import { db, collection, addDoc } from "./firebaseConfig.js";

// Form ka reference lein
document.getElementById("addProductForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Input Fields Se Data Lena
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  try {
    // Firebase Me Data Add Karna
    await addDoc(collection(db, "products"), {
      name: name,
      price: parseFloat(price),
      description: description,
      createdAt: new Date()
    });

    document.getElementById("message").innerText = "✅ Product Added Successfully!";
  } catch (error) {
    console.error("❌ Error Adding Product:", error);
    document.getElementById("message").innerText = "❌ Error Adding Product!";
  }

  // Form Clear Karna
  document.getElementById("addProductForm").reset();
});

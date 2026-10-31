import argon2 from "argon2";

async function generateHash() {
    let hashedPassword = await argon2.hash("admin12345");
    console.log("HASH:", hashedPassword);
}

generateHash();
// ==========================================
// WDD 231 Chamber Project
// Footer Dates
// Author: Emmanuel Eze
// ==========================================

const year = document.querySelector("#year");
const modified = document.querySelector("#lastModified");

year.textContent = new Date().getFullYear();

modified.textContent = document.lastModified;
const API_BASE = "https://localhost:7137/api";

// ✅ Helper function
function getAuthHeaders() {
  return {
    "accept": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  };
}

// ✅ الحصول على كل الوظائف
export async function getRequests() {
  const res = await fetch(`${API_BASE}/Request`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("فشل تحميل الوظائف");
  return res.json();
}

// ✅ البحث في الوظائف
export async function searchRequests(query) {
  const res = await fetch(`${API_BASE}/Request/search?query=${encodeURIComponent(query)}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("فشل البحث");
  return res.json();
}

// ✅ جلب وظيفة واحدة بالتفاصيل
export async function getRequestById(id) {
  const res = await fetch(`${API_BASE}/Request/${id}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("لم يتم العثور على الوظيفة");
  return res.json();
}

// ✅ API جديد للـ Provider profile
export async function getProfile() {
  const res = await fetch(`${API_BASE}/Account/profile`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("فشل تحميل بيانات المزود");
  return res.json();
}

// ✅ API جديد لكل الوظائف (بدون قيود)
export async function getAllRequests() {
  try {
    const res = await fetch(`${API_BASE}/Request/All`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("فشل تحميل الوظائف");
    return res.json();
  } catch (err) {
    console.error("Error fetching all requests:", err);
    return [];
  }
}

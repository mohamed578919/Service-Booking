const customerId = 1; // افتراضي، غيّره بناءً على الـ Login

// جلب الخدمات
async function loadServices() {
  try {
    const response = await fetch('https://localhost:7137/api/service');
    const services = await response.json();
    const select = document.getElementById('serviceId');
    select.innerHTML = '<option value="0">اختر خدمة</option>';
    services.forEach(service => {
      const option = document.createElement('option');
      option.value = service.id;
      option.textContent = service.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('خطأ في جلب الخدمات:', error);
  }
}

// جلب الطلبات
// جلب الطلبات
async function loadRequests() {
  try {
    const response = await fetch('https://localhost:7137/api/requests');
    const requests = await response.json();
    const list = document.getElementById('requestsList');
    list.innerHTML = '';
    requests.forEach(req => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded shadow flex justify-between items-center';
      div.innerHTML = `
        <div>
          <h3 class="font-medium">${req.notes || 'لا يوجد وصف'}</h3>
          <p class="text-gray-600">تاريخ الطلب: ${new Date(req.requestDate).toLocaleDateString()}</p>
          <p class="text-gray-600">الخدمة: ${req.serviceName}</p>
        </div>
        <div>
          <button class="edit-btn bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mr-2" data-id="${req.id}" data-notes="${req.notes || ''}">تعديل</button>
          <button class="delete-btn bg-red-500 text-white p-2 rounded hover:bg-red-600" data-id="${req.id}">حذف</button>
        </div>
      `;
      list.appendChild(div);
    });
    document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', editRequest));
    document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', deleteRequest));
  } catch (error) {
    console.error('خطأ في جلب الطلبات:', error);
  }
}

// إضافة أو تعديل طلب
async function addOrUpdateRequest() {
  const notes = document.getElementById('requestNotes').value;
  const serviceId = document.getElementById('serviceId').value;
  const editId = document.getElementById('requestForm').dataset.editId || null;

  if (notes.trim() || (editId && document.getElementById('requestNotes').value.trim())) {
    try {
      const url = editId ? `https://localhost:7137/api/requests/${editId}` : 'https://localhost:7137/api/requests';
      const method = editId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: editId ? document.getElementById('requestNotes').value : notes,
          clientId: customerId,
          serviceId: parseInt(serviceId),
          requestDate: new Date()
        })
      });
      if (response.ok) {
        document.getElementById('requestNotes').value = '';
        document.getElementById('serviceId').value = '0';
        delete document.getElementById('requestForm').dataset.editId;
        document.getElementById('cancelEdit').classList.add('hidden');
        loadRequests();
      } else {
        console.error('خطأ من السيرفر:', await response.text());
      }
    } catch (error) {
      console.error('خطأ في إضافة/تعديل الطلب:', error);
    }
  }
}

// تعديل طلب
function editRequest(event) {
  const id = event.target.dataset.id;
  const notes = event.target.dataset.notes;
  document.getElementById('requestNotes').value = notes;
  document.getElementById('requestForm').dataset.editId = id;
  document.getElementById('cancelEdit').classList.remove('hidden');
}

// حذف طلب
async function deleteRequest(event) {
  try {
    const id = event.target.dataset.id;
    const response = await fetch(`https://localhost:7137/api/requests/${id}`, { method: 'DELETE' });
    if (response.ok) {
      loadRequests();
    } else {
      console.error('خطأ من السيرفر:', await response.text());
    }
  } catch (error) {
    console.error('خطأ في حذف الطلب:', error);
  }
}

// إضافة شكوى
async function addComplaint() {
  const text = document.getElementById('complaintText').value;
  if (text.trim()) {
    try {
      const response = await fetch('https://localhost:7137/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (response.ok) {
        document.getElementById('complaintText').value = '';
        alert('تم إرسال الشكوى!');
      } else {
        console.error('خطأ من السيرفر:', await response.text());
      }
    } catch (error) {
      console.error('خطأ في إضافة الشكوى:', error);
    }
  }
}

// إضافة الأحداث
document.getElementById('requestForm').addEventListener('submit', (e) => {
  e.preventDefault();
  addOrUpdateRequest();
});
document.getElementById('cancelEdit').addEventListener('click', () => {
  document.getElementById('requestNotes').value = '';
  document.getElementById('serviceId').value = '0';
  delete document.getElementById('requestForm').dataset.editId;
  document.getElementById('cancelEdit').classList.add('hidden');
});
document.getElementById('complaintForm').addEventListener('submit', (e) => {
  e.preventDefault();
  addComplaint();
});

// تحميل البيانات عند بدء الصفحة
window.onload = () => {
  loadServices();
  loadRequests();
};
export default function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;

    res.status(200).json({success:true, result: 'Форма успешно отправлена' });
  }
  else {
    res.status(405).json({success:false, error: 'Метод не поддерживается' });
  }
}

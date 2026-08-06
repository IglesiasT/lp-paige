export const buildWhatsAppUrl = (phone, message = '') => {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

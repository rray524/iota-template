export const handlePhoneChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const value = event.target.value.replace(/\D/g, "").slice(0, 10);
  event.target.value = value;
};

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content p-4 mt-auto">
      <p className="text-center text-sm">
        © {new Date().getFullYear()} My Dashboard. All rights reserved.
      </p>
    </footer>
  );
}

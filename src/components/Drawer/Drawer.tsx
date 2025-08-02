interface DrawerMenuProps {
  drawerId: string;
}

export default function DrawerMenu({ drawerId }: DrawerMenuProps) {
  return (
    <div className="ds-drawer-side z-40">
      {/* Clicking overlay closes drawer */}
      <label
        htmlFor={drawerId}
        aria-label="close sidebar"
        className="ds-drawer-overlay"
      ></label>

      {/* Drawer Content */}
      <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content space-y-2">
        <li>
          <a className="ds-btn ds-btn-ghost justify-start">Dashboard</a>
        </li>
        <li>
          <a className="ds-btn ds-btn-ghost justify-start">Settings</a>
        </li>
        <li>
          <a className="ds-btn ds-btn-ghost justify-start">Logout</a>
        </li>
      </ul>
    </div>
  );
}

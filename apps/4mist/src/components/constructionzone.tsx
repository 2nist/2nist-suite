// Import necessary components
import Header from './Header';
import LayoutShell from './LayoutShell';
import ThemeToggle from './ThemeToggle';
import ToolsMenu from './ToolsMenu';
import TitleInput from './TitleInput';

export default function ConstructionZone() {
  return (
    <LayoutShell>
      <Header />
      <ThemeToggle />
      <ToolsMenu />
      <TitleInput />
    </LayoutShell>
  );
}
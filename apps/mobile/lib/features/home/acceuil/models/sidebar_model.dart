class SidebarModel {
  int selectedIndex;
  bool isDarkTheme;

  SidebarModel({this.selectedIndex = 0, this.isDarkTheme = true});

  void selectIndex(int index) {
    selectedIndex = index;
  }

  void toggleTheme() {
    isDarkTheme = !isDarkTheme;
  }
}

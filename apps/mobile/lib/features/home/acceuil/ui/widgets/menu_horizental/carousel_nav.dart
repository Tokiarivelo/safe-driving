import 'package:flutter/material.dart';

class CarouselNav extends StatefulWidget {
  final List<String> items;
  const CarouselNav({super.key, required this.items});

  @override
  State<CarouselNav> createState() => _CarouselNavState();
}

class _CarouselNavState extends State<CarouselNav> {
  late PageController _pageController;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(
      viewportFraction: 1 / 5,
      initialPage: 1000,
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  int _realIndex(int index) {
    return index % widget.items.length;
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: PageView.builder(
        controller: _pageController,
        scrollDirection: Axis.horizontal,
        onPageChanged: (index) {
          setState(() {
            _currentIndex = _realIndex(index);
          });
        },
        itemBuilder: (context, index) {
          final realIndex = _realIndex(index);
          final isActive = realIndex == _currentIndex;

          return AnimatedScale(
            scale: isActive ? 1.2 : 1.0,
            duration: const Duration(milliseconds: 300),
            child: GestureDetector(
              onTap: () {
                _pageController.animateToPage(
                  index,
                  duration: const Duration(milliseconds: 400),
                  curve: Curves.easeOut,
                );
              },
              child: Container(
                decoration: BoxDecoration(
                  color: isActive ? Colors.blueAccent : Colors.grey[300],
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: isActive
                      ? [
                          BoxShadow(
                            color: Colors.black26,
                            blurRadius: 10,
                            offset: const Offset(0, 4),
                          ),
                        ]
                      : [],
                ),
                alignment: Alignment.center,
                child: Text(
                  widget.items[realIndex],
                  style: TextStyle(
                    color: isActive ? Colors.white : Colors.black,
                    fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

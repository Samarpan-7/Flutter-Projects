import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'login_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ApiService api = ApiService();
  final TextEditingController fromController = TextEditingController();
  final TextEditingController toController = TextEditingController();
  final TextEditingController amountController = TextEditingController();

  String result = '';

  void convert() async {
    final data = await api.convertCurrency(
      fromController.text.trim(),
      toController.text.trim(),
      double.tryParse(amountController.text) ?? 0,
    );

    setState(() {
      result = data?['conversion']?['conversion_result']?.toString() ?? 'Error';
    });
  }

  void logout() async {
    await api.logout();
    if (mounted) {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const LoginPage()));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Currency Converter'),
        actions: [
          IconButton(onPressed: logout, icon: const Icon(Icons.logout))
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: fromController, decoration: const InputDecoration(labelText: 'From Currency (e.g. USD)')),
            TextField(controller: toController, decoration: const InputDecoration(labelText: 'To Currency (e.g. INR)')),
            TextField(controller: amountController, decoration: const InputDecoration(labelText: 'Amount')),
            const SizedBox(height: 20),
            ElevatedButton(onPressed: convert, child: const Text('Convert')),
            const SizedBox(height: 20),
            Text('Result: $result', style: const TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }
}

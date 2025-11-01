import 'dart:convert';
import 'package:http/http.dart' as http;
import '../utils/secure_storage.dart';

class ApiService {
  final String baseUrl = "http://localhost:4000/api";
  final storage = SecureStorage();

  Future<bool> signup(String name, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/signup'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password}),
    );
    return response.statusCode == 201;
  }

  Future<bool> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      await storage.saveToken(data['token']);
      return true;
    } else {
      return false;
    }
  }

  Future<Map<String, dynamic>?> convertCurrency(String from, String to, double amount) async {
    final token = await storage.getToken();
    final response = await http.post(
      Uri.parse('$baseUrl/convert'),
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json'
      },
      body: jsonEncode({'from': from, 'to': to, 'amount': amount}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      return null;
    }
  }

  Future<void> logout() async {
    await storage.deleteToken();
  }
}

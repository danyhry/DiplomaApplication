package com.danyhry.diplomaapplication.controller;

import com.danyhry.diplomaapplication.model.Expense;
import com.danyhry.diplomaapplication.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Expense>> getExpensesByUserId(@PathVariable Long userId) {
        List<Expense> expenses = expenseService.getExpensesByUserId(userId);
        return ResponseEntity.ok(expenses);
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        Expense createdExpense = expenseService.createExpense(expense);
        return ResponseEntity.ok(createdExpense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpenseById(@PathVariable Long id, @RequestBody Expense expense) {
        Expense updateExpense = expenseService.updateExpenseById(id, expense);
        return ResponseEntity.ok(updateExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteExpenseById(@PathVariable Long id) {
        Boolean isExpenseDeleted = expenseService.deleteExpenseById(id);
        return ResponseEntity.ok(isExpenseDeleted);
    }
}

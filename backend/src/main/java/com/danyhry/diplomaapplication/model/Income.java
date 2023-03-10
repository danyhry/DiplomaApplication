package com.danyhry.diplomaapplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Income {
    private Long id;
    private Long userId;
    private Long categoryId;
    private String description;
    private Long amount;
    private LocalDate date;
}

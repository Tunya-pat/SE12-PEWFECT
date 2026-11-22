package com.example.project.item;

import java.net.URI;
import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemRepository repository;

    public ItemController(ItemRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Item> list() { return repository.findAll(); }

    @PostMapping
    public ResponseEntity<Item> create(@Valid @RequestBody CreateItem request) {
        Item saved = repository.save(new Item(request.name().trim(), request.description().trim()));
        return ResponseEntity.created(URI.create("/api/items/" + saved.getId())).body(saved);
    }

    public record CreateItem(@NotBlank @Size(max = 120) String name,
                             @NotBlank @Size(max = 1000) String description) {}
}

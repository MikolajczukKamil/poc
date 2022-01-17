package pl.kamil.poc.foo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/spring")
@RequiredArgsConstructor
public class FooController {
    private final FooRepository fooRepository;

    @GetMapping("/test")
    public FooEntity test() {
        try {
            return fooRepository.getById(1);
        }
        catch (Exception e) {
            return null;
        }
    }
}

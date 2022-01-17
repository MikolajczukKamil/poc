package pl.kamil.poc.foo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(value = "/spring")
@RequiredArgsConstructor
public class FooController {
    private final FooRepository fooRepository;

    @GetMapping("/test")
    public FooEntity test() {
        try {
            var entity = fooRepository.getById(1);
            var entity2 = fooRepository.getById(1);

            System.out.println(entity == entity2);

            if (entity.getList() == null) {
                 entity.setList(new ArrayList<>());
            }

             entity.getList().add(new FooDataEntity(null, "Test", entity));

             fooRepository.save(entity);

            return entity;
        }
        catch (Exception e) {
            return null;
        }
    }
}

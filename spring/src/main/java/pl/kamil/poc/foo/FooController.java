package pl.kamil.poc.foo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "/spring")
@RequiredArgsConstructor
public class FooController {
    private final FooRepository fooRepository;

    @GetMapping("test")
    public Object test() {
        try {
            // var entity = fooRepository.getById(1);
            // var entity2 = fooRepository.getById(1);

            // System.out.println(entity == entity2);

            // if (entity.list == null) {
            //     entity.list = new ArrayList<>();
            // }

            // entity.list.add(new FooDataEntity(null, "Test", entity));

            // fooRepository.save(entity);

            return List.of(1, 2, 3);
        }
        catch (Exception e) {
            return null;
        }
    }
}

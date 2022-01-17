package pl.kamil.poc.foo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FooRepository extends JpaRepository<FooEntity, Integer> {
}

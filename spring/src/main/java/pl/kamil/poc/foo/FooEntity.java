package pl.kamil.poc.foo;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="foo")
public class FooEntity implements Serializable {
    @Id()
    private Integer id;

    @Column()
    private String name;

    @Column()
    private Integer version;
}

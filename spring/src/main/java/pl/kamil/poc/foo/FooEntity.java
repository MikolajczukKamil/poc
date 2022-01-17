package pl.kamil.poc.foo;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="foo")
public class FooEntity {
    @Id()
    public int id;

    @Column()
    public String name;

    @OneToMany(
            mappedBy = "foo",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    public List<FooDataEntity> list;
}

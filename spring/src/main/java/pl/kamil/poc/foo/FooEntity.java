package pl.kamil.poc.foo;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name="foo")
public class FooEntity implements Serializable {
    @Id()
    private int id;

    @Column()
    private String name;

    @Column()
    private Integer version;

    @OneToMany(
            mappedBy = "foo",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    private List<FooDataEntity> list;
}

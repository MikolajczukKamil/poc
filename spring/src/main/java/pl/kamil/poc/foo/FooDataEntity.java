package pl.kamil.poc.foo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="foo_data")
public class FooDataEntity implements Serializable  {
    @Getter()
    @Setter()
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = null;

    @Getter()
    @Setter()
    @Column()
    private String data = null;

    @JsonIgnore
    @Setter()
    @JoinColumn(name = "foo_id", nullable = false)
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    private FooEntity foo = null;

    @JsonIgnore
    public FooEntity getFoo() {
        return this.foo;
    }
}

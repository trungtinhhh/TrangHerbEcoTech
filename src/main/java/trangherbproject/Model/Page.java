package trangherbproject.Model;

public class Page {
    private String front;
    private String back;

    public Page(String front, String back) {
        this.front = front;
        this.back = back;
    }

    public String getFront() { return front; }
    public String getBack() { return back; }
}


<template>
  <div class="login">
    <div class="logincon">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "密码不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { username, password } = this.ruleForm;
          if (username == "admin" && password == "123456") {
            this.$message({
              message: "💐恭喜登录成功~",
              type: "success"
            });
            sessionStorage["userMsg"] = Math.random();
            this.$router.push({ path: this.$route.query.redirect || "/zgjs" });
          } else {
            this.$message({
              message: "用户名或密码不对~",
              type: "warning"
            });
          }
        } else {
          this.$message.error("请正确输入用户名和密码");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="postcss">
.login {
  padding-top: 10%;
  display: flex;
  justify-content: center;
  align-content: center;
  & .logincon {
    border: 1px #409eff dashed;
    --loginconUnit: 30px;
    border-radius: var(--loginconUnit);
    padding: var(--loginconUnit);
    width: 30%;
  }
}
</style>

